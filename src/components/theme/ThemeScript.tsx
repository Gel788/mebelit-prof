export function ThemeScript() {
  const code = `
    (function() {
      try {
        var stored = localStorage.getItem('mebelit-theme');
        var theme = stored === 'light' || stored === 'dark' ? stored : 'light';
        var root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        root.style.colorScheme = theme;
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
