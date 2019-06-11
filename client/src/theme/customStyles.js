const customStyles = (theme) => {
	const custom = {
		overrides: {
			MuiButton: {
				// Name of the component ⚛️ / style sheet
				text: {
					// Name of the rule
					color: 'white' // Some CSS
				}
			},
			CardActionArea: {
				root: {
					color: '#f00',
					background: '#f00'
				}
			}
		},
		LoginPaper: {
			minWidth: '300px',
			maxWidth: '500px',
			marginLeft: 'auto',
			marginRight: 'auto',
			marginTop: '100px',
			padding: '2em'
		},
		FieldContainer: {
			width: '100%'
		},
		textfield: {
			display: 'block',
			width: '100%'
		},
		searchInput: {
			fontSize: '1.2em',
			borderRadius: '0.3em'
		},
		fullWidthButton: {
			width: '100%',
			margin: '15px 0'
		},
		relativeContainer: {
			position: 'relative'
		},
		popupPageContainer: {
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: '30px'
		},
		FormContainer: {},
		overlay: {
			width: '100%',
			height: '100%',
			opacity: '0.3',
			background: '#333'
		},
		addOrgFormRoot: {
			width: '500px'
		}
	};
	return custom;
};
module.exports = customStyles;
