module.exports = function(eleventyConfig) {
	
	eleventyConfig.addLayoutAlias("posts", "layouts/post.njk");
	
	// Markdown it
	let markdownIt = require("markdown-it");
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};
	
	eleventyConfig.setLibrary("md", markdownIt(options));
	
	// Add filter
	eleventyConfig.addFilter("dateDisplay", require("./src/_filters/dates.js") );
	
	// SVG
	svgContents = require("eleventy-plugin-svg-contents");
	eleventyConfig.addPlugin(svgContents);
	
	eleventyConfig.addWatchTarget('./src/css/');
	eleventyConfig.addWatchTarget('./src/js/');
	eleventyConfig.addWatchTarget('./src/images/');
	eleventyConfig.addWatchTarget('./src/favicons/');
	eleventyConfig.addPassthroughCopy('./src/css/');
	eleventyConfig.addPassthroughCopy('./src/js/');
	eleventyConfig.addPassthroughCopy('./src/images/');
	eleventyConfig.addPassthroughCopy('./src/favicons/');
	
	return {
		dir: {
			input: 'src',
			output: 'public'
		},
		markdownTemplateEngine: 'njk'
	}
	
}