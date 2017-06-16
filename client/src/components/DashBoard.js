import React, { Component } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

class DashBoard extends Component {
  render() {
    const styles = {
      root: {
        maxWidth: '720px',
        margin: '30px auto'
      },
      actions: {
        marginTop: '32px',
        marginBottom: '32px',
        textAlign: 'center'
      }
    }
    return (
      <div style={styles.root}>
        <div style={styles.actions}>
          <Link to='/posts/new'>
            <RaisedButton label='添加新文章' primary={true} />
          </Link>
        </div>
      </div>
    );
  }
}

export default DashBoard;
