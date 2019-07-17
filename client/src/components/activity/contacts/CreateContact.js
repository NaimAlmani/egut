import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../../theme/customStyles';
import { addNewContact } from '../../../actions/activity';
import { Paper, Typography, TextField, Button, Avatar } from '@material-ui/core';
import Title from './../../common/Title';
import ImageUploader from 'react-images-upload';
import IconItem from './../../common/icons/IconItem';
import isEmpty from './../../../validation/is-empty';
const styles = (theme) => ({
    popupPageContainer: {     
    },
    overlay: {
        width: '100%',
        height: '100%',
        opacity: '0.3',
        background: '#333'
    },
    FormContainer: {
       margin:'20px'
    },
    button: {
        margin: theme.spacing.unit
    },
    closeIcon: {
        textAlign: 'right'
    }
});

class CreateContact extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            tel: '',
            pictures: [],
            logo: null,
            oldLogo: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
       
    }

    componentWillReceiveProps(nextProps) { }
    onDrop(picture, file) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            logo: file
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            tel:this.state.tel,
            activity_id:this.props.activity,
            logo: this.state.pictures[0]
        };
        this.props.addNewContact(data);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
          
                <Paper className={classes.FormContainer} elevation={1}>
                    <form onSubmit={this.onSubmit} encType='multipart/form-data'>
                        <div className={classes.FieldContainer}>
                            <TextField
                                id='outlined-email-input'
                                label='Name'
                                className={(classes.textField, classes.textfield)}
                                type='text'
                                name='name'
                                autoComplete='name'
                                margin='normal'
                                variant='outlined'
                                fullWidth={true}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className={classes.FieldContainer}>
                            <TextField
                                id='outlined-email-input'
                                label='email'
                                className={(classes.textField, classes.textfield)}
                                type='email'
                                name='email'
                                margin='normal'
                                variant='outlined'
                                fullWidth={true}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className={classes.FieldContainer}>
                            <TextField
                                id='outlined-email-input'
                                label='tel'
                                className={(classes.textField, classes.textfield)}
                                type='text'
                                name='tel'
                                margin='normal'
                                variant='outlined'
                                fullWidth={true}
                                onChange={this.onChange}
                            />
                        </div>

                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            singleImage={true}
                            withPreview={true}
                            name='fileInput'
                            className='imageInputFile'
                        />
                        <div style={{ textAlign: 'right' }}>
                            {!isEmpty(this.state.oldLogo) ? (
                                <div className={classes.oldImageCont}>
                                    <Avatar
                                        alt='logo'
                                        src={config.imagesPath + this.state.oldLogo}
                                        className={classes.bigAvatar}
                                    />
                                </div>
                            ) : null}
                            <Button
                                variant='outlined'
                                color='primary'
                                className={classes.button}
                                size='large'
                                type='submit'
                            >
                                Add
							</Button>
                            <Button
                                variant='outlined'
                                color='error'
                                className={classes.button}
                                size='large'
                                onClick={this.props.onCancel}
                            >
                                cancel
							</Button>
                        </div>
                    </form>
                </Paper>
     
        );
    }
}

CreateContact.propTypes = {
    addNewContact: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    loading: state.loading,
});

export default connect(mapStateToProps, { addNewContact })(withStyles(styles, { withTheme: true })(CreateContact));
