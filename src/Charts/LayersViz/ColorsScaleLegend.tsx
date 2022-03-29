import React from 'react';

import type { NNContext } from 'src/NNContext';

interface ColorsScaleLegendProps {
  nnCtx: NNContext;
}

const CANVAS_HEIGHT = 260;
const SCALE_HEIGHT = 235;
const WIDTH = 42;
const MAX = 2.5;
const MIN = -2.5;

const dpr = Math.floor(window.devicePixelRatio);

const drawColorsScaleLegend = async (ctx: CanvasRenderingContext2D, nnCtx: NNContext) => {
  ctx.scale(dpr, dpr);
  const colorData: Uint8Array = await nnCtx.getColorScaleLegend(MIN, MAX, 18, SCALE_HEIGHT);
  const imageData = new ImageData(new Uint8ClampedArray(colorData.buffer), 18, SCALE_HEIGHT);
  ctx.putImageData(imageData, 0, (CANVAS_HEIGHT - SCALE_HEIGHT) / 2);

  ctx.font = '12px "PT Sans"';
  ctx.fillStyle = '#ccc';
  ctx.fillText(`${MAX.toFixed(1)}`, 22, (CANVAS_HEIGHT - SCALE_HEIGHT) / 2 + 6);
  ctx.fillText('0', 22, CANVAS_HEIGHT / 2 + 3);
  ctx.fillText(`${MIN.toFixed(1)}`, 22, (CANVAS_HEIGHT + SCALE_HEIGHT) / 2 + 3);
};

const ColorsScaleLegend: React.FC<ColorsScaleLegendProps> = ({ nnCtx }) => (
  <canvas
    className='colors-scale-legend'
    width={WIDTH * dpr}
    height={CANVAS_HEIGHT * dpr}
    style={{ width: WIDTH, height: CANVAS_HEIGHT }}
    ref={canvas => {
      if (!canvas) {
        return;
      }
      drawColorsScaleLegend(canvas.getContext('2d')!, nnCtx);
    }}
  />
);

export default React.memo(ColorsScaleLegend);
