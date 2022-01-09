const fs = require('fs');
const path = require('path');
const {
    override,
    removeModuleScopePlugin,
    babelInclude,
    addWebpackAlias,
} = require('customize-cra');

// We can read package.json of the symlinked package
const symlinkedPackageJson = fs.readFileSync(path.join(__dirname, 'node_modules', 'wagtail-rest-pack', 'package.json')).toString();

const { peerDependencies } = JSON.parse(symlinkedPackageJson);

// We can build aliases for all peer depencies and pointing them to node_modules inside our current app
const aliases = Object.keys(peerDependencies).reduce((acc, cur) => {
    acc[cur] = fs.realpathSync(path.join(__dirname, 'node_modules', cur));

    return acc;
}, {});

module.exports = override(
    removeModuleScopePlugin(),
    babelInclude([
        path.resolve(path.join(__dirname, 'src')),
        fs.realpathSync(path.join(__dirname, 'node_modules/wagtail-rest-pack/src')),
    ]),

    // Define the aliases
    addWebpackAlias({
        ...aliases,
    }),
);