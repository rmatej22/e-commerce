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
  selector: "[appShellRender]",
})
export class AppShellRenderDirective implements OnInit {
  constructor(
    private templateReference: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.createEmbeddedView(this.templateReference);
    } else {
      this.viewContainer.clear();
    }
  }
}
