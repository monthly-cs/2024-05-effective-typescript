// @ts-nocheck

//24. 일관성 있는 별칭 사용하기
interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}

function isPointInPolygon1(polygon: Polygon, pt: Coordinate) {
  if (polygon.bbox) {
    if (pt.x < polygon.bbox.x[0] || pt.x > polygon.bbox.x[1] || pt.y < polygon.bbox.y[0] || pt.y > polygon.bbox.y[1]) {
      return false
    }
  }
}

function isPointInPolygon2(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (polygon.bbox) {
    if (pt.x < box.x[0] || pt.x > box.x[1] || pt.y < box.y[0] || pt.y > box.y[1]) {
      return false
    }
  }
}

function isPointInPolygon3(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (box) {
    if (pt.x < box.x[0] || pt.x > box.x[1] || pt.y < box.y[0] || pt.y > box.y[1]) {
      return false
    }
  }
}


function isPointInPolygon4(polygon: Polygon, pt: Coordinate) {
  const {bbox} = polygon;
  if (bbox) {
    const {x, y} = bbox
    if (pt.x < x[0] || pt.x > y[0] || pt.y > y[1]) {
      return false
    }
  }
}


function isPointInPolygon5(polygon: Polygon, pt: Coordinate) {
  const {bbox} = polygon;

  if (bbox) {
    const {x, y} = bbox
    if (pt.x < x[0] || pt.x > y[0] || pt.y > y[1]) {
      return false
    }
  }
}

const polygon: Polygon = {exterior: [], holes: []}

function fn(polygon: Polygon) {
  return polygon.bbox = {
    x: [0, 1],
    y: [2, 3]
  };
}

const {bbox} = polygon;
if (!bbox) {
  fn(polygon)
  console.log(polygon.bbox, bbox)
  // polygon.bbox =x: [0, 1], y: [2, 3]
  // bbox = undefined
}


/* 별칭은 타입스크립트가 타입을 좁히는 것을 방해한다.
 따라서 변수에 별칭을 사용할 때는 일관되게 사용해야 한다.
 */
