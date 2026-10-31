'use client';

import { useEffect, useRef } from 'react';
import styles from './LeafCanvas.module.scss';

const LEAF_COUNT = 20;

// 캔버스는 CSS 변수를 읽지 못해 색을 여기 둔다 (세이지·포레스트·연세이지·황금·연두)
const LEAF_COLORS = [
  { fill: 'rgba(139, 158, 126, 0.6)', stroke: 'rgba(74, 94, 59, 0.3)' },
  { fill: 'rgba(74, 94, 59, 0.5)', stroke: 'rgba(58, 75, 46, 0.3)' },
  { fill: 'rgba(168, 184, 158, 0.5)', stroke: 'rgba(139, 158, 126, 0.3)' },
  { fill: 'rgba(180, 165, 120, 0.5)', stroke: 'rgba(139, 115, 85, 0.3)' },
  { fill: 'rgba(160, 175, 130, 0.5)', stroke: 'rgba(100, 120, 70, 0.3)' },
];

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  tick: number;
  color: (typeof LEAF_COLORS)[number];
  // 0 타원 · 1 뾰족 · 2 둥근 잎
  shape: number;
}

const random = (min: number, max: number) => min + Math.random() * (max - min);

function createLeaf(width: number, height: number, isInitial: boolean): Leaf {
  return {
    x: Math.random() * width,
    // 처음에는 화면 위쪽 바깥에 흩어 두어 한꺼번에 떨어지지 않게 한다
    y: isInitial ? -Math.random() * height : -30,
    size: random(10, 24),
    speedX: random(-0.2, 0.2),
    speedY: random(0.4, 1.2),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: random(-0.0125, 0.0125),
    swaySpeed: random(0.008, 0.023),
    swayOffset: Math.random() * Math.PI * 2,
    opacity: random(0.15, 0.5),
    tick: 0,
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    shape: Math.floor(Math.random() * 3),
  };
}

function drawLeaf(context: CanvasRenderingContext2D, leaf: Leaf) {
  const s = leaf.size;
  context.save();
  context.translate(leaf.x, leaf.y);
  context.rotate(leaf.rotation);
  context.globalAlpha = leaf.opacity;
  context.fillStyle = leaf.color.fill;
  context.strokeStyle = leaf.color.stroke;

  context.beginPath();
  if (leaf.shape === 0) {
    context.moveTo(0, -s * 0.5);
    context.bezierCurveTo(s * 0.5, -s * 0.4, s * 0.5, s * 0.4, 0, s * 0.5);
    context.bezierCurveTo(-s * 0.5, s * 0.4, -s * 0.5, -s * 0.4, 0, -s * 0.5);
  } else if (leaf.shape === 1) {
    context.moveTo(0, -s * 0.6);
    context.bezierCurveTo(s * 0.4, -s * 0.2, s * 0.35, s * 0.3, 0, s * 0.6);
    context.bezierCurveTo(-s * 0.35, s * 0.3, -s * 0.4, -s * 0.2, 0, -s * 0.6);
  } else {
    context.ellipse(0, 0, s * 0.35, s * 0.45, 0, 0, Math.PI * 2);
  }
  context.fill();

  // 잎맥
  context.beginPath();
  context.lineWidth = leaf.shape === 2 ? 0.4 : 0.5;
  context.moveTo(0, -s * 0.45);
  context.lineTo(0, s * 0.45);
  if (leaf.shape === 2) {
    context.moveTo(0, -s * 0.1);
    context.lineTo(s * 0.2, -s * 0.25);
    context.moveTo(0, 0);
    context.lineTo(-s * 0.2, -s * 0.05);
  }
  context.stroke();
  context.restore();
}

// 화면 위로 천천히 떨어지는 잎사귀. 동작 줄이기 설정이면 그리지 않는다.
export default function LeafCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;

    // 레티나 화면에서 흐려지지 않게 기기 픽셀 비율만큼 키워 그린다
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();

    const leaves = Array.from({ length: LEAF_COUNT }, () => createLeaf(width, height, true));

    const animate = () => {
      context.clearRect(0, 0, width, height);
      leaves.forEach((leaf, index) => {
        leaf.tick += 1;
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(leaf.tick * leaf.swaySpeed + leaf.swayOffset) * 0.4;
        leaf.rotation += leaf.rotationSpeed;
        if (leaf.y > height + 30) leaves[index] = createLeaf(width, height, false);
        drawLeaf(context, leaves[index]);
      });
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
