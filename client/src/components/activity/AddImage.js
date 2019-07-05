import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { addNewImage } from '../../actions/activity';
import { Paper, TextField, Button, Avatar } from '@material-ui/core';
import Title from '../common/Title';
import ImageUploader from 'react-images-upload';
import IconItem from '../common/icons/IconItem';
import isEmpty from './../../validation/is-empty';
const styles = (theme) => ({
    popupPageContainer: {
        position: 'fixed',
        width: '100%',
        height: '100vh',
        top: '0',
        left: '0'
    },
    overlay: {
        width: '100%',
        height: '100%',
        opacity: '0.3',
        background: '#333'
    },
    FormContainer: {
        width: '400px',
        padding: '20px 50px',
        position: 'absolute',
        top: '100px',
        left: 'calc(50% - 200px)',
        minWidth: '300px'
    },
    button: {
        margin: theme.spacing.unit
    },
    closeIcon: {
        textAlign: 'right'
    }
});

class AddImage extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            pictures: [],
            path: null,
            oldLogo: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentWillReceiveProps(nextProps) { }
    onDrop(picture, file) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            path: file
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const data = {
            title: this.state.title,
            description: this.state.description,
            path: this.state.pictures[0],
            activity_id:this.props.activity.id
        };
        this.props.addNewImage(data);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.popupPageContainer}>
                <div className={classes.overlay} />
                <Paper className={classes.FormContainer} elevation={1}>
                    <div className={classes.closeIcon}>
                        <span onClick={this.props.onCancel} style={{ cursor: 'pointer', width: 'auto' }}>
                            <IconItem name='x' type='Feather' />
                        </span>
                    </div>
                    <Title text='Add Image' color={this.props.theme.palette.primary.main} icon='lock' />
                    <form onSubmit={this.onSubmit} encType='multipart/form-data'>
                        <div className={classes.FieldContainer}>
                            <TextField
                                id='outlined-email-input'
                                label='Title'
                                className={(classes.textField, classes.textfield)}
                                type='text'
                                name='title'
                                margin='normal'
                                variant='outlined'
                                fullWidth={true}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className={classes.FieldContainer}>
                            <TextField
                                label='Description'
                                className={(classes.textField, classes.textfield)}
                                type='text'
                                name='description'
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
                                        alt='path'
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
            </div>
        );
    }
}

AddImage.propTypes = {
    addNewImage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    loading: state.loading,
});

export default connect(mapStateToProps, { addNewImage })(withStyles(styles, { withTheme: true })(AddImage));
