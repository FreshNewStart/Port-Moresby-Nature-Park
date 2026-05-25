import { BrowserQRCodeReader } from "@zxing/browser";

export function startScanner(video, status, onResult) {
  const codeReader = new BrowserQRCodeReader();

  return codeReader.decodeFromVideoDevice(
    null,
    video,
    (result, err) => {

      if (result) {
        const text = result.getText();
        status.innerText = text;

        codeReader.reset();
        onResult(text);
      }

    }
  );
}