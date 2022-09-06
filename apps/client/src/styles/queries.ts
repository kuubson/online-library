const breakpoints = {
   largeDesktop: '1200px',
   mediumDesktop: '1100px',
   desktop: '1000px',
   smallDesktop: '900px',
   mediumTablet: '800px',
   tablet: '600px',
   smallTablet: '500px',
   mobile: '400px',
}

export const queries = {
   largeDesktop: `(max-width: ${breakpoints.largeDesktop})`,
   mediumDesktop: `(max-width: ${breakpoints.mediumDesktop})`,
   desktop: `(max-width: ${breakpoints.desktop})`,
   smallDesktop: `(max-width: ${breakpoints.smallDesktop})`,
   mediumTablet: `(max-width: ${breakpoints.mediumTablet})`,
   tablet: `(max-width: ${breakpoints.tablet})`,
   smallTablet: `(max-width: ${breakpoints.smallTablet})`,
   mobile: `(max-width: ${breakpoints.mobile})`,

   minLargeDesktop: `(min-width: ${breakpoints.largeDesktop})`,
   minMediumDesktop: `(min-width: ${breakpoints.mediumDesktop})`,
   minDesktop: `(min-width: ${breakpoints.desktop})`,
   minSmallDesktop: `(min-width: ${breakpoints.smallDesktop})`,
   minMediumTablet: `(min-width: ${breakpoints.mediumTablet})`,
   minTablet: `(min-width: ${breakpoints.tablet})`,
   minSmallTablet: `(min-width: ${breakpoints.smallTablet})`,
   minMobile: `(min-width: ${breakpoints.mobile})`,
}
