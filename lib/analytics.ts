// Simple analytics wrapper - replace with your actual analytics implementation
export const Analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // For development, just log to console
    console.log(`[Analytics] ${event}`, properties);
    
    // Implement your actual analytics tracking here
    // Example: if using Google Analytics
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', event, properties);
    // }
  },
};
