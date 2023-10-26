const requireComponent = require.context('./', false, /\.extension\.ts$/);
const requireAll = requireComponent.keys().map(requireComponent);

let extension: any = [];

for (const item of requireAll) {
  const defaults: any = (item as any).default;
  // extension[defaults.name.toLowerCase()] = defaults;
  extension.push(defaults);
}

export default extension;
