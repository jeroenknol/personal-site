export const toggleTheme = () => {
  if (document) {
    const previousPreferedDark = localStorage.getItem('theme') === 'dark';
    if (previousPreferedDark) {
      localStorage.setItem('theme', 'light');
      document.querySelector('html')?.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      document.querySelector('html')?.classList.add('dark');
    }
  }
};
