const breakpoints = {
   largeDesktop: '1600px',
   mediumDesktop: '1100px',
   desktop: '900px',
   mediumTablet: '768px',
   tablet: '500px',
   mobile: '400px',
}

export const queries = {
   largeDesktop: `(max-width: ${breakpoints.largeDesktop})`,
   mediumDesktop: `(max-width: ${breakpoints.mediumDesktop})`,
   desktop: `(max-width: ${breakpoints.desktop})`,
   mediumTablet: `(max-width: ${breakpoints.mediumTablet})`,
   tablet: `(max-width: ${breakpoints.tablet})`,
   mobile: `(max-width: ${breakpoints.mobile})`,

   minLargeDesktop: `(min-width: ${breakpoints.largeDesktop})`,
   minMediumDesktop: `(min-width: ${breakpoints.mediumDesktop})`,
   minDesktop: `(min-width: ${breakpoints.desktop})`,
   minMediumTablet: `(min-width: ${breakpoints.mediumTablet})`,
   minTablet: `(min-width: ${breakpoints.tablet})`,
   minMobile: `(min-width: ${breakpoints.mobile})`,
}
