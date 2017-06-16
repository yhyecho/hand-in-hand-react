import React, { Component } from 'react';
import Radium from 'radium';
import { config } from '../../config';

class PostItem extends Component {
  getStyles() {
    return {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        border: '1px solid rgba(200, 215, 255, 0.5)',
        boxShadow: '0 1px 2px #e9eff3',
        marginBottom: '24px',
        position: 'relative'
      },
      content: {
        padding: '16px 24px 12px',
        lineHeight: '1.3em'
      },
      name: {
        color: '#2e4453',
        fontWeight: '600',
        fontSize: '1.2em',
        textDecoration: 'none'
      },
      cover: {
        borderBottom: 'solid, 1px rgba(200, 215, 225, 0.5)',
        maxHeight: '300px',
        overflowY: 'hidden'
      },
      image: {
        display: 'block',
        width: '100%'
      }
    }
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        <div style={styles.cover}>
          <img src={`${config.host}/uploads/covers/${this.props.post.cover}`} style={styles.image} />
        </div>
        <div style={styles.content}>
          <div style={styles.name}>
            {this.props.post.name}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(PostItem);
