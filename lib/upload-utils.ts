import { unlink } from "fs/promises";
import path from "path";

export async function deleteUploadFile(filePath: string) {
  if (!filePath || !filePath.startsWith("/uploads/")) return;
  const fullPath = path.join(process.cwd(), "public", filePath);
  try {
    await unlink(fullPath);
  } catch {
    // File might not exist, ignore
  }
}
