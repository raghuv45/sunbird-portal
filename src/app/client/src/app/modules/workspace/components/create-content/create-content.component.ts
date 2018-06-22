import { Router, ActivatedRoute, NavigationStart} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResourceService, ConfigService } from '@sunbird/shared';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { FrameworkService, PermissionService } from '@sunbird/core';
import { IInteractEventInput, IImpressionEventInput } from '@sunbird/telemetry';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  /*
 roles allowed to create textBookRole
 */
  textBookRole: Array<string>;
  /**
   * courseRole  access roles
  */
  courseRole: Array<string>;
  /**
    * lessonRole   access roles
  */
  lessonRole: Array<string>;
  /**
 * collectionRole  access roles
 */
  collectionRole: Array<string>;
  /**
  *  lessonplanRole access roles
  */
  lessonplanRole: Array<string>;
  /**
  *  lessonplanRole access roles
  */
  contentUploadRole: Array<string>;
  /**
   * To call resource service which helps to use language constant
   */
  public resourceService: ResourceService;
  /**
   * Reference for framework service
  */
  public frameworkService: FrameworkService;


  /**
  * To navigate to other pages
  */
  router: Router;

  /**
   * reference of permissionService service.
  */
  public permissionService: PermissionService;
  /**
  * reference of config service.
 */
  public configService: ConfigService;
  /**
	 * telemetryImpression
	*/
  telemetryImpression: IImpressionEventInput;
  /**
  * Constructor to create injected service(s) object
  *
  * Default method of DeleteComponent class

  * @param {ResourceService} resourceService Reference of ResourceService
 */
  constructor(configService: ConfigService, router: Router, resourceService: ResourceService,
    frameworkService: FrameworkService, permissionService: PermissionService, private activatedRoute: ActivatedRoute) {
    this.resourceService = resourceService;
    this.frameworkService = frameworkService;
    this.permissionService = permissionService;
    this.configService = configService;
    this.router = router;
    /**
      * check for previous route and redirect based on the previous url
     */
    this.router.events.filter(e => e instanceof NavigationStart )
      .bufferCount(2, 1).subscribe(e => {
        this.checkForPreviousRouteForRedirect(e);
    });
  }

  ngOnInit() {
    this.frameworkService.initialize();
    this.textBookRole = this.configService.rolesConfig.workSpaceRole.textBookRole;
    this.courseRole = this.configService.rolesConfig.workSpaceRole.courseRole;
    this.lessonRole = this.configService.rolesConfig.workSpaceRole.lessonRole;
    this.collectionRole = this.configService.rolesConfig.workSpaceRole.collectionRole;
    this.lessonplanRole = this.configService.rolesConfig.workSpaceRole.lessonplanRole;
    this.contentUploadRole = this.configService.rolesConfig.workSpaceRole.contentUploadRole;
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        uri: this.activatedRoute.snapshot.data.telemetry.uri
      }
    };
  }

  checkForPreviousRouteForRedirect (e) {
    const previousUrl = e[0]['url'].split('/');
    const currentUrl = e[1]['url'].split('/');
     /**
      * if current url is in /create and previous url is edit/draft then redirect
     */
    if (previousUrl.indexOf('edit') !== -1 &&
        previousUrl.indexOf('draft') !== -1 &&
          currentUrl.indexOf('create') !== -1) {
      this.redirect();
    }
  }

  redirect() {
    this.router.navigate(['./create'], {relativeTo: this.activatedRoute.parent});
  }


}
