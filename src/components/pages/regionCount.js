import React, { Component } from 'react';

export default class RegionCount extends Component {

    render () {

        var children = this.props.children;
        var output = children.map(function(child){
            return (
                <span>
                    {child.signUpCount}
                </span>
            )
        })
        return (
            <div>
                {output} 
            </div>
        )
    
    }
}