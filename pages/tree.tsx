import TreeNodeDetails from "@/components/Tree/TreeNodeDetails/TreeNodeDetails";
import TreeWithNavigation from "@/components/Tree/TreeWithNavigation/TreeWithNavigation";
import { DEFAULT_ROOT_ID } from "@/constants/tree";
import { NavigationContextProvider } from "@/context/navigation";
import { NodeSelectionContextProvider, useUrlTreeRootId } from "@/context/tree";
import { getFamiliesMap, getTreeNodesMap } from "@/data";
import s from "@/styles/TreePage.module.css";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const TreePage: NextPage = () => {
  const router = useRouter();
  const { rootId } = useUrlTreeRootId();

  const treeNodesMap = getTreeNodesMap();
  const familiesMap = getFamiliesMap();

  const rootName = useMemo(() => {
    if (rootId && treeNodesMap[rootId] !== undefined) {
      return treeNodesMap[rootId].data.fullName;
    }
    return treeNodesMap[DEFAULT_ROOT_ID].data.fullName;
  }, [rootId, treeNodesMap]);

  const hasInvalidRoot = rootId && (familiesMap[rootId] === undefined || treeNodesMap[rootId] === undefined);

  useEffect(() => {
    if (hasInvalidRoot) {
      router.replace("/404");
    }
  }, [hasInvalidRoot, router]);

  if (hasInvalidRoot) return null;

  return (
    <NodeSelectionContextProvider>
      <NavigationContextProvider>
        <div className={s.absoluteContainer}>
          <div className={s.treeRootNameContainer}>
            {/* <span className={s.treeRootTitle}>👉 Root of the tree 🌳</span> */}
            <span className={s.treeRootName}>🌳 for {rootName}</span>
          </div>
          {/* {rootId !== DEFAULT_ROOT_ID && (
            <Link href="/tree">
              <a className={s.homeTreeLink}>👉 To the main tree 🌳</a>
            </Link>
          )} */}
        </div>

        <TreeWithNavigation />
        <TreeNodeDetails />
      </NavigationContextProvider>
    </NodeSelectionContextProvider>
  );
};

export default TreePage;
