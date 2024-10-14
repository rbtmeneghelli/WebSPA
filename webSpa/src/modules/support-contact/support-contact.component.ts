import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ListLinksModel } from "../../core/models/list-links.model";

@Component({
    selector: 'app-support-contact',
    standalone: true,
    imports: [MatIconModule, MatCardModule, MatListModule, CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonToggleModule, MatTooltipModule],
    templateUrl: './support-contact.component.html',
})

export class SupportContactComponent {

    public listaContatos: ListLinksModel[] = [
        { description: 'Instagram', link: 'https://www.instagram.com/xpto/', icon: 'photo_camera' },
        { description: 'Facebook', link: 'https://www.facebook.com/xpto', icon: 'thumb_up' },
        { description: 'Github', link: 'https://github.com/xpto', icon: 'laptop' },
        { description: 'Email', link: 'https://gmail.com/', icon: 'email' },
        { description: 'WhatsApp', link: 'https://api.whatsapp.com/send?text=Enviar%20um%20pagina%20https://developertools.com.br&phone=5511999998888', icon: 'phone' },
        { description: 'Youtube', link: 'https://www.youtube.com/', icon: 'smart_display' }
    ];

    openLink(link: string){
        window.open(link, "_blank");
    }
}