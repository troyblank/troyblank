import {
  AMOEBA_COUNT,
  type Amoeba,
  createAmoeba,
  drawAmoeba,
  scaleAmoeba,
  updateAmoeba,
} from './organisms/amoeba';
import {
  DIFFLUGIA_COUNT,
  type Difflugia,
  createDifflugia,
  drawDifflugia,
  scaleDifflugia,
  updateDifflugia,
} from './organisms/difflugia';
import {
  EUGLENA_COUNT,
  type Euglena,
  createEuglena,
  drawEuglena,
  scaleEuglena,
  updateEuglena,
} from './organisms/euglena';
import { type FieldContext, fieldScale } from './organisms/utils';

export class AmoebaField {
  private ctx: CanvasRenderingContext2D;
  private amoebas: Amoeba[] = [];
  private euglenas: Euglena[] = [];
  private difflugias: Difflugia[] = [];
  private width = 0;
  private height = 0;
  private mouseX = 0.5;
  private mouseY = 0.5;
  private lastTime: number | null = null;
  private organismScale = 1;
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2d context unavailable');
    this.ctx = ctx;
    this.seed();
    window.addEventListener('mousemove', this.onMouse);
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  private get field(): FieldContext {
    return {
      ctx: this.ctx,
      width: this.width,
      height: this.height,
      mouseX: this.mouseX,
      mouseY: this.mouseY,
    };
  }

  private seed() {
    this.organismScale = fieldScale();
    this.amoebas = Array.from({ length: AMOEBA_COUNT }, () => createAmoeba());
    this.euglenas = Array.from({ length: EUGLENA_COUNT }, () => createEuglena());
    this.difflugias = Array.from({ length: DIFFLUGIA_COUNT }, () => createDifflugia());
  }

  private rescaleOrganisms(factor: number) {
    for (const amoeba of this.amoebas) scaleAmoeba(amoeba, factor);
    for (const euglena of this.euglenas) scaleEuglena(euglena, factor);
    for (const difflugia of this.difflugias) scaleDifflugia(difflugia, factor);
  }

  private onMouse = (e: MouseEvent) => {
    this.mouseX = e.clientX / window.innerWidth;
    this.mouseY = e.clientY / window.innerHeight;
  };

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const nextScale = fieldScale(this.width, this.height);
    const ratio = nextScale / this.organismScale;
    if (Math.abs(ratio - 1) > 0.01) {
      this.rescaleOrganisms(ratio);
      this.organismScale = nextScale;
    }
  };

  tick(time: number) {
    const { ctx, width, height } = this;
    const field = this.field;

    const dt = this.lastTime === null ? 1 / 60 : Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;

    ctx.fillStyle = '#0a100c';
    ctx.fillRect(0, 0, width, height);

    const wash = ctx.createRadialGradient(
      width * 0.5,
      height * 0.45,
      0,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.65,
    );
    wash.addColorStop(0, 'rgba(32, 52, 36, 0.3)');
    wash.addColorStop(1, 'rgba(8, 12, 10, 0)');
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, width, height);

    for (const amoeba of this.amoebas) {
      updateAmoeba(amoeba, dt, field);
    }
    for (const euglena of this.euglenas) {
      updateEuglena(euglena, dt, field);
    }
    for (const difflugia of this.difflugias) {
      updateDifflugia(difflugia, dt, field);
    }

    type Drawable = { y: number; draw: () => void };
    const drawables: Drawable[] = [
      ...this.amoebas.map((a) => ({ y: a.y, draw: () => drawAmoeba(field, a, time) })),
      ...this.euglenas.map((e) => ({ y: e.y, draw: () => drawEuglena(field, e, time) })),
      ...this.difflugias.map((d) => ({ y: d.y, draw: () => drawDifflugia(field, d, time) })),
    ];
    drawables.sort((a, b) => a.y - b.y);
    for (const d of drawables) d.draw();

    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      height * 0.15,
      width / 2,
      height / 2,
      height * 0.9,
    );
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, 'rgba(4, 8, 6, 0.52)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }

  destroy() {
    window.removeEventListener('mousemove', this.onMouse);
    window.removeEventListener('resize', this.resize);
  }
}
