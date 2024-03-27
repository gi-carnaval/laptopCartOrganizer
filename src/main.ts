import QrScanner from "qr-scanner";

const video = <HTMLVideoElement>document.getElementById('qr-video');
const videoContainer = <HTMLElement>document.getElementById('video-container');
const camList = <HTMLElement>document.getElementById('cam-list');

type CartKey = string;
type Cart = Record<CartKey, number[]>;
type CarrinhosDicionarioProps = {
  [key: string]: string;
};

interface ResultItemProps {
  data: string;
  cornerPoints: {
    x: number;
    y: number;
  }[];
}
let resultSpan = <HTMLElement>document.getElementById('resultSpan');
let cartNumberResult = <HTMLElement>document.getElementById('cartNumberResult');
let resultWaiting = ''

const carts: Cart = {
  carrinho_1: [
    1265999, 1266046, 1266045, 1266043, 1265994, 1266009, 
    1265976, 1266052, 1266033, 1265979, 1266039, 1266053, 
    1266012, 1266022, 1265971,1265981,1266047,1266004
  ],
  carrinho_2: [],
  carrinho_3: [],
  carrinho_4: [
    1266050,1266036,1266017,1265982,1266037,1266056,1265991,
    1265980,1265978,1266034,1266015,1266000,1266001,1266010,
    1266057,1266038,1266021,1265993,1266025,1266018,1266055,
    1265989,1266054,1265987,1265984
  ]
}

const carrinhosDicionario: CarrinhosDicionarioProps = {
  carrinho_1: "CARRINHO 1", carrinho_2: "CARRINHO 2", carrinho_3: "CARRINHO 3",
  carrinho_4: "CARRINHO 4"
}

function verifyCart(code: string): string | null {
  cartNumberResult.innerHTML = ""
  cartNumberResult.style.background = "transparent"
  for (const cartKey in carts) {
    const cartItems = carts[cartKey];
    if (cartItems.includes(Number(code))) {
      resultSpan.innerHTML = `O notebook ${code} pertence ao`
      cartNumberResult.innerHTML = carrinhosDicionario[cartKey]
      cartNumberResult.style.background = "red"
      return cartKey;
    } else {
      resultSpan.innerHTML = `O notebook ${code} não pertence a nenhum carrinho`
    }
  }

  return null;
}

export function onScanSuccess(decodedText: string) {
  verifyCart(decodedText.substring(0, 7));
}

function setResult(result: ResultItemProps) {
  if (resultWaiting !== result.data) {
    resultWaiting = result.data
    onScanSuccess(result.data)
  }

}

const scanner = new QrScanner(video, result => setResult(result), {
  highlightScanRegion: true,
  highlightCodeOutline: true,
});

videoContainer.className = "example-style-1"

scanner.setInversionMode("both");

camList.addEventListener('change', (event) => {
  const target = event.target as HTMLSelectElement;
    if (target && target instanceof HTMLSelectElement) {
        scanner.setCamera(target.value);
    }
});

const botaoIniciar = document.getElementById('start-button')
const botaoEncerrar = document.getElementById('stop-button')

if (botaoIniciar && botaoEncerrar) {
  botaoIniciar.addEventListener('click', () => {
    scanner.start();
  });

  botaoEncerrar.addEventListener('click', () => {
    scanner.stop();
  });
}
