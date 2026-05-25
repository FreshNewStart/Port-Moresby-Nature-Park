import { BrowserMultiFormatReader } from "@zxing/browser";

window.addEventListener("DOMContentLoaded", () => {

  const codeReader = new BrowserMultiFormatReader();

  const video = document.getElementById("video");
  const status = document.getElementById("status");
  const startBtn = document.getElementById("start");

  startBtn.addEventListener("click", async () => {

    try {

      status.innerText = "Starting camera...";

      const devices =
        await BrowserMultiFormatReader.listVideoInputDevices();

      if (!devices.length) {
        throw new Error("No camera found");
      }

      const selectedDeviceId = devices[0].deviceId;

      codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        video,
        (result, err) => {

          if (result) {

            const text = result.getText();

            status.innerText = text;

            codeReader.reset();

            if (text.startsWith("http")) {
              window.location.href = text;
            } else {
              window.location.href = `/animals/${text}`;
            }

          }

        }
      );

    } catch (err) {

      console.error(err);

      status.innerText = "Error: " + err.message;

    }

  });

});