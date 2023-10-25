const requireComponent = require.context('./', false, /\.tsx$/);

const requireAll = requireComponent.keys().map(requireComponent);
let skeleton: any = {};

for (const item of requireAll) {
  const defaults: any = (item as any).default;
  skeleton[defaults.type] = defaults;
}

export default skeleton;
