 
import {getMedia} from getMedia


async function getMedia(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream; 
  } catch (err) {
  console.error("Error accessing media devices.", err);
    throw err; 
  }
}



document.getElementById('video').addEventListener('click', async () => {
  const constraints = {
    video: true,
  };

  const stream = await navigator.mediaDevices.getDisplayMedia(constraints);

  const peerConnection = new RTCPeerConnection();

  stream.getTracks().forEach(track => {
    peerConnection.addTrack(track, stream);
  });
});

document.getElementById('audio').addEventListener('click', async () => {
  const constraints = {
    audio: true,
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  const peerConnection = new RTCPeerConnection();

  stream.getTracks().forEach(track => {
    peerConnection.addTrack(track, stream);
  });
});

navigator.mediaDevices.enumerateDevices().then(devices => {
  const audioOutputs = devices.filter(d => d.kind === 'audiooutput');
});

const audioElement = document.createElement('audio');
audioElement.srcObject = webRtcStream;

if (typeof audioElement.setSinkId === 'function') {
  audioElement.setSinkId(selectedDeviceId)
    .then(() => {
      audioElement.play();
    })
    .catch(err => {
      console.error('Error setting sinkId:', err);
    });
} else {
  alert('Your browser does not support output device selection.');
}