import React from 'react';
import { getBezierPath } from 'reactflow';
import { IoTrashSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeEdge } from '../../../slice/diagram-builder-slice';

const foreignObjectSize = 40;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const dispatch = useDispatch();

  const onEdgeClick = (id) => {
    dispatch(removeEdge(id));
  };

  return (
    <>
        <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
        />
        <foreignObject
            width={foreignObjectSize}
            height={foreignObjectSize}
            x={labelX - foreignObjectSize / 2}
            y={labelY - foreignObjectSize / 2}
            className="edgebutton-foreignobject"
            requiredExtensions="http://www.w3.org/1999/xhtml"
        >
            <div>
            <button className="edgebutton" onClick={() => onEdgeClick(id)}>
                <IoTrashSharp size={18}/>
            </button>
            </div>
        </foreignObject>
    </>
  );
}