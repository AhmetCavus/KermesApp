import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export interface PinInputProps {
  length?: number;                 // default 5
  label?: string;                  // header title
  autoFocus?: boolean;             // focus first box on mount
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void; // fires when all digits filled
}

const isDigit = (v: string) => /^[0-9a-z]$/.test(v);

const PinInput: React.FC<PinInputProps> = ({
  length = 5,
  label = "Enter PIN",
  autoFocus = true,
  disabled = false,
  error,
  helperText,
  size = "medium",
  onChange,
  onComplete,
}) => {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const valueStr = useMemo(() => values.join(""), [values]);

  useEffect(() => {
    onChange?.(valueStr);
    if (values.every((v) => v !== "")) onComplete?.(valueStr);
  }, [valueStr]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoFocus && refs.current[0]) {
      refs.current[0].focus();
      refs.current[0].select?.();
    }
  }, [autoFocus]);

  const focusIndex = (i: number) => {
    const el = refs.current[i];
    if (el) {
      el.focus();
      setTimeout(() => el.select?.(), 0);
    }
  };

  const handleChange = (i: number, next: string) => {
    const char = next.slice(-1);
    if (!isDigit(char)) return;

    setValues((prev) => {
      const copy = prev.slice();
      copy[i] = char;
      return copy;
    });

    if (i < length - 1) setTimeout(() => focusIndex(i + 1), 0);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const i = Number(target.dataset.index);

    if (e.key === "Backspace") {
      if (values[i]) {
        setValues((prev) => {
          const copy = prev.slice();
          copy[i] = "";
          return copy;
        });
        return;
      }
      if (i > 0) {
        e.preventDefault();
        focusIndex(i - 1);
        setValues((prev) => {
          const copy = prev.slice();
          copy[i - 1] = "";
          return copy;
        });
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      focusIndex(i - 1);
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      focusIndex(i + 1);
    }
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const startIndex = Number(target.dataset.index);
    const digits = (e.clipboardData.getData("text") || "")
      .split("")
      .filter(isDigit)
      .slice(0, length);

    if (!digits.length) return;

    setValues((prev) => {
      const copy = prev.slice();
      for (let k = 0; k < digits.length && startIndex + k < length; k++) {
        copy[startIndex + k] = digits[k];
      }
      return copy;
    });

    const nextFocus = Math.min(startIndex + digits.length, length - 1);
    focusIndex(nextFocus);
  };

  return (
    <Card
      elevation={4}
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 3,
        borderRadius: 3,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LockIcon />
          </Avatar>
        }
        title={
          <Typography variant="h6" fontWeight={700}>
            {label}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {length}-digit access
          </Typography>
        }
        sx={{ pb: 1.5 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Stack direction="row" spacing={1.5} justifyContent="center">
          {Array.from({ length }).map((_, i) => (
            <TextField
              key={i}
              type="password" // masked
              inputMode="text"
              autoComplete="one-time-code"
              variant="outlined"
              size={size}
              value={values[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              disabled={disabled}
              error={error}
              inputRef={(el) => (refs.current[i] = el)}
              inputProps={{
                "data-index": i,
                maxLength: 1,
                inputMode: "text",
                pattern: "[0-9a-z]*",
                style: {
                  textAlign: "center",
                  width: size === "small" ? 42 : 52,
                  fontSize: size === "small" ? 20 : 24,
                  padding: "10px 0",
                  letterSpacing: 2,
                },
              }}
            />
          ))}
        </Stack>

        {helperText && (
          <Typography
            variant="caption"
            color={error ? "error" : "text.secondary"}
            sx={{ display: "block", textAlign: "center", mt: 1.25 }}
          >
            {helperText}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PinInput;
