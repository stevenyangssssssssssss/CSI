export function getUserHierarchy(userId: number, data: any[]) {
  const hierarchy: any[] = [];
  let subordinates: any[] = [];

  function traverse(node: any) {
    if (node.id === userId) {
      hierarchy.push(node);
      subordinates = node.children;
      return true;
    }

    if (node.children) {
      for (const child of node.children) {
        if (traverse(child)) {
          hierarchy.push(node);
          return true;
        }
      }
    } else {
      if (hierarchy.length > 0) {
        subordinates.push(node);
      }
    }
    return false;
  }

  traverse(data[0]);
  hierarchy.reverse();

  return { hierarchy, subordinates };
}
