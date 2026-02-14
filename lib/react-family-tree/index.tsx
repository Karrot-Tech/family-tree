import { useNavigationContext } from "@/context/navigation";
import calcTree from "@/lib/relatives-tree";
import { ExtNode, Node, RelData } from "@/lib/relatives-tree/types";
import React, { useEffect, useMemo } from "react";
import Connector from "./connector";

interface Props {
  nodes: ReadonlyArray<Node>;
  rootId: string;
  width: number;
  height: number;
  placeholders?: boolean;
  className?: string;
  renderNode: (node: ExtNode) => React.ReactNode;
}

export default React.memo<Props>(function ReactFamilyTree(props) {
  const { setRootCoords } = useNavigationContext();

  const data = useMemo<RelData>(
    () =>
      calcTree(props.nodes, {
        rootId: props.rootId,
        placeholders: props.placeholders,
      }),
    [props.nodes, props.rootId, props.placeholders]
  );

  const width = props.width / 2;
  const height = props.height / 2;

  useEffect(() => {
    const x = (data.families[0].X ?? 0) * width;
    const y = (data.families[0].Y ?? 0) * height;
    setRootCoords({ x, y });
  }, [data, height, setRootCoords, width]);

  return (
    <div
      className={props.className}
      style={{
        position: "relative",
        width: data.canvas.width * width,
        height: data.canvas.height * height,
      }}
    >
      {data.connectors.map((connector, idx) => (
        <Connector key={idx} connector={connector} width={width} height={height} />
      ))}
      {data.nodes.map(props.renderNode)}
    </div>
  );
});
