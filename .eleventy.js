const { DateTime } = require("luxon");

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

	//Date
	eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	  });
	
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
			output: 'dist'
		},
		markdownTemplateEngine: 'njk'
	}
	
}
