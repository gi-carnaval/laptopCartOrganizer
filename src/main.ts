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
        1265977, 1266013, 1266048, 1266035, 1265974,
        1266018, 1265999, 1266021, 1266052, 1265993,
        1266055, 1265987, 1266017, 1266056, 1266034,
        1265984, 1266000

    ],
    carrinho_2: [
        1266040, 1265985, 1266023, 1266049, 1266050, 
        1266036, 1265975, 1266005, 1265994, 1266047, 
        1266044, 1266008, 1266028, 1265998, 1266003, 
        1265971, 1266030,

    ],
    carrinho_3: [
        1266006, 1266041, 1266014, 1266031, 1266020,
        1266029, 1266042, 1266051, 1266019, 1266002,
        1265970, 1265983, 1266011, 1266004, 1266024,
        1266058, 1266007, 
    ],
    carrinho_4: [
        1265976, 1265977, 1265978, 1265979, 1265980,
        1265981, 1265982, 1265983, 1265984, 1265985,
        1265986, 1265987, 1265988, 1265989, 1265990,
        1265991, 1265992, 1265993, 1265994, 1265995,
        1265996, 1265997, 
    ]
}

const carrinhosDicionario: CarrinhosDicionarioProps = {
    carrinho_1: "CARRINHO 1",
    carrinho_2: "CARRINHO 2",
    carrinho_3: "CARRINHO 3",
    carrinho_4: "CARRINHO 4"
}

function verifyCart(code: string) {
    cartNumberResult.innerHTML = ""
    cartNumberResult.style.background = "transparent"

    for (const cartKey in carts) {
        const cartItems = carts[cartKey];

        if (cartItems.includes(Number(code))) {
            resultSpan.innerHTML = `O notebook ${code} pertence ao`
            cartNumberResult.innerHTML = carrinhosDicionario[cartKey]
            cartNumberResult.style.background = "red"

            return

        } else {
            resultSpan.innerHTML = `O notebook ${code} não pertence a nenhum carrinho`
            cartNumberResult.innerHTML = ""
            cartNumberResult.style.background = "transparent"
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
