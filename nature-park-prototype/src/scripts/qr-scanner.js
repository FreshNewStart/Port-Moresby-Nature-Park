import { BrowserMultiFormatReader } from "@zxing/browser";

document.addEventListener("DOMContentLoaded", () => {

  console.log("QR Scanner Loaded");

  const codeReader = new BrowserMultiFormatReader();

  const video = document.getElementById("video");
  const status = document.getElementById("status");
  const startBtn = document.getElementById("start");

  if (!video || !status || !startBtn) {
    console.error("Scanner elements not found");
    return;
  }

  startBtn.addEventListener("click", async () => {

    console.log("Start button clicked");

    try {

      status.innerText = "Requesting camera access...";

      const devices =
        await BrowserMultiFormatReader.listVideoInputDevices();

      console.log("Devices:", devices);

      if (!devices.length) {
        throw new Error("No camera found");
      }

      const selectedDeviceId = devices[0].deviceId;

      status.innerText = "Camera starting...";

      await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        video,
        (result, err) => {

          if (result) {

            const text = result.getText();

            console.log("QR Result:", text);

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