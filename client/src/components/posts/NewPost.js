import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from './BasicForm';

class NewPost extends Component {
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

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        <p style={styles.title}>添加新文章</p>
        <form>
          <BasicForm />
          <div style={styles.submit}>
            <RaisedButton type="submit" label="发布" primary={true} />
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;
