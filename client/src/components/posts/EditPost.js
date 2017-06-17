import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from './BasicForm';
import isEmpty from 'lodash/fp/isEmpty';
import { connect } from 'react-redux';
import { getPost, clearPost, editPost } from '../../redux/actions/postActions';

class EditPost extends Component {
  componentWillMount() {
    this.props.getPost(this.props.params.postId);
  }

  componentWillUnmount() {
    this.props.clearPost();
  }

  getStyles() {
    return {
      root: {
        maxWidth: '720px',
        margin: '32px auto'
      },
      title: {
        textAlign: 'center',
        color: '#2e4453',
        fontSize: '1.3em'
      },
      submit: {
        textAlign: 'center',
        marginTop: '32px'
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const basic = this.refs.basic.getBasicFormInputValue();
    this.props.editPost(basic, this.props.params.postId);
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        <p style={styles.title}>编辑文章</p>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          { !isEmpty(this.props.post) ? <BasicForm ref="basic" post={this.props.post}/> : '' }
          <div style={styles.submit}>
            <RaisedButton type="submit" label="更新" primary={true} />
          </div>
        </form>
      </div>
    );
  }
}

EditPost.propTypes = {
  post: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost, clearPost, editPost })(EditPost);
