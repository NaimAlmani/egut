const initTheme = {
	palette: {
		primary: {
			light: '',
			main: '#df8546',
			dark: '',
			contrastText: '#fff'
		},
		secondary: {
			light: '#f0f0f0',
			main: '#333',
			dark: '#a8a0ff',
			contrastText: '#fff'
		},
		error: {
			light: '#f00',
			main: '#f00',
			dark: '#f00',
			contrastText: '#fff'
		},
		select: {
			light: 'rgba(110,163,253,0.5)',
			main: 'rgba(110,163,253,1)',
			dark: '#00f',
			contrastText: '#fff'
		},
		overlay: {
			main: '#454545'
		},
		pink: {
			main: '#fd92df',
			contrastText: '#fff'
		},
		purple: {
			main: '#a8a0ff',
			contrastText: '#fff'
		},
		green: {
			main: '#32cbc2',
			contrastText: '#fff'
		},
		blue: {
			main: '#6ea3fd',
			contrastText: '#fff'
		},
		peach: {
			main: '#ff9797',
			contrastText: '#fff'
		},
		black: {
			main: '#333',
			contrastText: '#fff'
		},
		red: {
			main: 'f00'
		}
	},
	typography: {
		fontFamily: [
			'Lato',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	}
};
module.exports = initTheme;
