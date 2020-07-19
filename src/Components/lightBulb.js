import React from "react";
import  {Icon} from "semantic-ui-react"


class LightBulb extends Icon {
    render(){
        return(
                <div>
                    <Icon  color={this.props.lightstate} name='lightbulb' />

                </div>
    )}
}


export default LightBulb