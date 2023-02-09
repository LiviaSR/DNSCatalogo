 // Function to set a given theme/color-scheme
        function setTheme(themeName) {
            localStorage.setItem('theme', themeName);
            document.documentElement.className = themeName;
        }

        // function to toggle between light and light theme
        function toggleTheme() {
            if (localStorage.getItem('theme') === 'theme-ligh') {
                setTheme('theme-dark');
            } else {
                setTheme('theme-light');
            }
        }

        // Immediately invoked function to set the theme on initial load
        (function () {
            if (localStorage.getItem('theme') === 'theme-ligh') {
                setTheme('theme-light');
                document.getElementById('slider').checked = false;
            } else {
                setTheme('theme-dark');
              document.getElementById('slider').checked = true;
            }
        })();