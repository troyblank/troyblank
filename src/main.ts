import './style.css';
import { AmoebaField } from './amoebas';

const bgCanvas = document.querySelector<HTMLCanvasElement>('#bg-canvas');
if (!bgCanvas) throw new Error('Background canvas missing');

const field = new AmoebaField(bgCanvas);

const loop = (time: number) => {
  field.tick(time);
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
document.body.classList.add('loaded');
