import { defineConfig } from "eslint";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
    files: ["**.*.ts"],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "error",
    },
    }
])