const fs = require('fs')

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt)
	grunt.initConfig({
		exec: {
			lint: { cmd: 'npx eslint src ' },
			test: { cmd: 'npx jest --config jest-unit-config.json ' },
			tsc: { cmd: 'npx tsc ' },
			release: { cmd: './release.sh' },
			to_develop: { cmd: './to_develop.sh' },
			doc: { cmd: 'npx typedoc ' }
		},
		clean: {
			build: ['build'],
			dist: ['dist']
		},
		copy: {
			lib: { expand: true, cwd: 'build/lib', src: '**', dest: 'dist/' },
			readme: { expand: true, src: './README.md', dest: 'dist/' },
			license: { expand: true, src: './LICENSE', dest: 'dist/' }
		}
	})

	grunt.registerTask('create-package', 'create package.json for dist', function () {
		const data = require('./package.json')
		delete data.devDependencies
		delete data.scripts
		delete data.private
		data.main = 'index.js'
		data.types = 'index.d.ts'
		fs.writeFileSync('dist/package.json', JSON.stringify(data, null, 2), 'utf8')
	})

	grunt.registerTask('build-config', 'build configuration', function () {
		const task = require('./src/dev/task/buildConfig')
		task.apply(this.async())
	})

	grunt.registerTask('build-wiki', 'build wiki', function () {
		const task = require('./build/dev/task/buildWiki')
		task.apply(this.async())
	})

	grunt.registerTask('lint', ['exec:lint'])
	grunt.registerTask('build', ['lint', 'clean:build', 'build-config', 'exec:tsc'])
	grunt.registerTask('test', ['exec:test'])
	grunt.registerTask('dist', ['build', 'test', 'clean:dist', 'copy:lib', 'copy:readme', 'copy:license', 'create-package'])
	grunt.registerTask('release', ['dist', 'exec:release'])
	grunt.registerTask('to_develop', ['build', 'test', 'exec:to_develop'])
	grunt.registerTask('doc', ['build-wiki', 'exec:doc'])
	grunt.registerTask('default', [])
}
