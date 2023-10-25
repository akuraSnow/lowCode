const requireComponent = require.context('./', false, /\.extension\.ts$/);
const requireAll = requireComponent.keys().map(requireComponent);

let components: any = [];

for (const item of requireAll) {
  const defaults: any = (item as any).default;
  // components[defaults.name.toLowerCase()] = defaults;
  components.push(defaults);
}

export default components;
