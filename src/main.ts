import { Html5QrcodeScanner } from "html5-qrcode";

function verifyCart(code: string) {

  const carts = {
    cart_1: [15451651651, 541651616516],
    cart_2: [14981668995, 651652315189],
    cart_3: [52635963226, 85236523615],
    cart_4: [48491651651, 654181655615]
  }

  for (const cartKey in carts) {
    const cartItems = carts[cartKey];
    if (cartItems.includes(code)) {
      return cartKey;
    }
  }
  
  return null; // Retorna null se o código não estiver em nenhum carrinho
  console.log(carts)
}

function onScanSuccess(decodedText: string) {
  console.log(decodedText)
  verifyCart(decodedText)
}

function onScanFailure(error: string) {
  console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);