import { isPlatformServer } from "@angular/common";
import {
  Directive,
  Inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

@Directive({
  selector: "[appShellNoRender]",
})
export class AppShellNoRenderDirective implements OnInit {
  constructor(
    private templateReference: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateReference);
    }
  }
}
