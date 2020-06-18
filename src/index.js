import _ from 'lodash';

let component = () => {
    let element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack1kk11'], ' ');
    return element;
}
document.body.appendChild(component());