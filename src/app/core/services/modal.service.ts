import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private componentRef? : ComponentRef<any>
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef : ApplicationRef,
    private injector : Injector
  ) { }


  openModal(component : Type<any>, data?: any) : void{
    const componentFactory =  this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView)

    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    if(data){
      Object.assign(this.componentRef.instance, data);
    }

    this.componentRef.instance.closeModal = () => {
      this.closeModal();
    }
  }

  closeModal() {
    this.componentRef?.destroy();
  }

}
