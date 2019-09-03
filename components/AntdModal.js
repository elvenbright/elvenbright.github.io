import React from 'react';
import { Modal } from 'antd';
import DragM from "dragm";
import { ResizableBox } from "react-resizable";
import './AntdModal.less';
//README
//открытие и закрытие модалкой контролиреутся
//props.visible - bool - true/false
//props.onCancel - func - отрабатывает при нажатии на крестик/кнопка отмены(в футере)



//props.className - string - добавить класс
//props.title - string - заголовок
//props.width - stirng - '80%'/'100px' ширина модалки


//props.footer - string/jsx/false - футер
//      props.onOk - func - отрабатывает при нажатии на ok
//      props.onCancel - func - отрабатывает при нажатии на крестик/кнопка отмены(в футере)

//resize (если использовать нужен resize - надо прислать props.width={"min-content"}
//props.resize - bool - если true, будет индикатор resize

const takeRight=(arr)=>{
    if(HTMLCollection.prototype.isPrototypeOf(arr)){
        return arr[arr.length-1];
    }
}


export class AntdModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalRef: null,
            modalVerticalCenter: false
        };
    }

    componentDidMount(){
        if(this.props.visible && !this.state.modalRef) {

            const modalRef = takeRight(document.getElementsByClassName("ant-modal-content"))[0];

            if(modalRef && !this.state.modalRef) {
                this.setState({
                    modalRef: modalRef,
                    modalVerticalCenter: this.getModalVerticalCenter(modalRef)
                });
            }
        }
    }

    setModalScroll = () => {
        const { modalRef, modalVerticalCenter } = this.state;

        if(this.props.visible && (modalRef && modalRef.offsetHeight)) {
            const maxHeightPercent = (modalVerticalCenter) ? 83 : 70;
            const modalHeightPercent = Math.ceil(modalRef.offsetHeight / (document.body.offsetHeight / 100));

            if(modalHeightPercent > maxHeightPercent) {
                return {
                    overflow: "auto",
                };
            } else {
                return {};
            }
        } else {
            return {};
        }
    }

    getModalVerticalCenter = (modalRef) => {
        if(this.props.visible && (modalRef && modalRef.offsetHeight)) {
            const modalHeightPercent = Math.ceil(modalRef.offsetHeight / (document.body.offsetHeight / 100));

            if(modalHeightPercent > 80) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };


    render() {
      const modalTitle = (<ModalDrag title={this.props.title} />);
        const modalBodyStyle = this.setModalScroll();
        const modalProps = {
            ...this.props,
            className: this.props.className+' AntdModal',
            title: modalTitle,
            destroyOnClose: true,
            maskClosable: false,
            bodyStyle: (this.props.bodyStyle) ? {...this.props.bodyStyle, ...modalBodyStyle} : modalBodyStyle,
            afterClose: () => {
                try {
                  document.getElementsByClassName("ant-modal-wrap")[0].style.transform = "translate(0px, 0px)";
                } catch (e) {}
            },
            wrapClassName: (this.state.modalVerticalCenter) ? "vertical-center-modal" : "",
            style: (this.props.style) ? {...this.props.style} : {}
        };

        return (
          <Modal  {...modalProps} >
            {this.props.resize
              ?
                <ResizableBox className={'ResizableBox'} width={200} height={200} minConstraints={[150, 150]}  maxConstraints={[window.innerWidth, window.innerHeight]}>{this.props.children}</ResizableBox>
              :
                <React.Fragment>{this.props.children}</React.Fragment>
            }
          </Modal>
        );
    }
}


export class ModalDrag extends React.Component{
    constructor(props){
      super(props);
    }

    componentDidMount() {
        this.modalWrap = takeRight(document.getElementsByClassName("ant-modal-wrap"))[0];
    }

    updateTransform = (transform) => this.modalWrap.style.transform = transform;

    render() {
        const {title} = this.props;

        return (
            <DragM updateTransform={this.updateTransform}>
              <div>{title}</div>
            </DragM>
        );
    }
}
