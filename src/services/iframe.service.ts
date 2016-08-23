import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class IFrameService {
    private iframe: HTMLIFrameElement;

    constructor(private window: Window) {
        this.iframe = window.document.createElement('iframe');
        this.iframe.style.display = 'none';
        window.document.body.appendChild(this.iframe);
    }

    public navigateTo(url: string): Observable<Location> {
        let token: ReplaySubject<Location> = new ReplaySubject<Location>();
        this.iframe.onload = ((event: Event) => {
            event.stopPropagation();
            token.next(this.iframe.contentWindow.location);
        });
        this.iframe.src = url;
        return token;
    }
}
