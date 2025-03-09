# ngx-swalify

ngx-swalify is an Angular library that simplifies the usage of SweetAlert2 by integrating it with RxJS. It provides a reusable way to handle confirmation dialogs, alerts, and notifications throughout your application.

## Features

- **RxJS-Based API**: Simplifies working with SweetAlert2 by using observables.
- **Predefined Configurations**: Set default configurations for `confirm`, `delete`, `error`, `info`, and `success` dialogs.
- **Consistent Usage**: Ensures a unified way of handling alerts across the application.
- **Don't repeat yourself**: Reduces repetitive code when implementing common dialogs.

## Installation

```sh
# Using npm
npm install ngx-swalify sweetalert2

# Using yarn
yarn add ngx-swalify sweetalert2
```

# Usage

- `ngx-swalify` provides a service called **NgxSwalifyService**, an abstraction layer for `sweetalert2`.
- Use this service directly to trigger `sweetalert2` alerts.

## Fire

The `fire` method is the core function of **NgxSwalifyService**. It allows you to display a **SweetAlert2** alert with fully customizable options.

Here’s how you can use it:

```ts
protected readonly ngxSwalifyService = inject(NgxSwalifyService);

showAlert(){
  this.ngxSwalifyService.fire({
	  options: {
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    },
  }).subscribe((result) => {
    if (result.isConfirmed) {
      console.log('Alert Confirmed');
    } else  if (result.isDenied) {
      console.log('Alert Denied');
    }
  });
}
```

### Handling HTTP Requests with NgxSwalifyService

```ts
protected readonly ngxSwalifyService = inject(NgxSwalifyService);
protected readonly httpService = inject(HttpClient);

httpDeletePost(id: number) {
  return this.httpService.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
}

showAlert() {
  this.ngxSwalifyService
    .fire({
      options: {
        title: 'Do you want to delete this post?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        icon:  'warning',
      },
      preConfirmObservable: this.httpDeletePost(1),
    })
    .pipe(
      filter((result) => result.isConfirmed && !!result.value),
      switchMap(() =>
        this.ngxSwalifyService.fire({
          options: {
            title: 'Post deleted successfully',
            icon: 'success',
          },
        })
      ),
    )
    .subscribe();
}


```

**Note:** If HTTP request fails, the `result.value` will be `null`. [Reference.](https://github.com/Sinan997/ngx-swalify/blob/main/projects/ngx-swalify/src/lib/utils/swailfy-utils.ts#L21-L27)

**Note:** You don’t need to manually **unsubscribe** from the observable returned by `fire`. The **unsubscription** process is handled **automatically.**

# Default Alerts

**NgxSwalifyService** provides a set of predefined methods like `.confirm`, `.delete`, `.success`, `.info`, and `.error` for quick and consistent alert creation.

Instead of manually configuring alerts every time, the service automatically applies these defaults for you.

#### Benefits of Using Default Configurations:

- **Time-saving**: Set default configurations once, and use them across your entire application without needing to redefine them for each alert.
- **Code Reusability**: Avoid code repetition by defining common settings in one place, making your codebase cleaner and easier to maintain.
- **Consistency**: Apply a standardized approach to alerts across your app, ensuring that all notifications have a unified look and feel.

#### How It Works

1.  **NgxSwalifyConfig** holds the default configurations for each alert type (e.g., confirm, delete, success, etc.).
2.  These default settings are injected into the **NgxSwalifyService** and automatically applied when calling alert methods.

**Note:** You can override the default settings by passing custom options when calling the alert methods like `.confirm()`, `.delete()`, or `.success()`. This allows you to adjust the alert for specific use cases without changing the global configuration.

## Set Default Alerts

```ts
// app.config.ts
import { initializer } from './initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(initializer),
  ],
};
```

```ts
// initializer.ts
import { inject } from '@angular/core';
import { NgxSwalifyConfig } from 'ngx-swalify';

export function initializer() {
  const ngxSwalifyConfig = inject(NgxSwalifyConfig);

  ngxSwalifyConfig.confirm = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    showCancelButton: true,
    icon: 'warning',
  };

  ngxSwalifyConfig.error = {
    title: 'Oops...',
    text: 'Something went wrong!',
    icon: 'error',
  };

  ngxSwalifyConfig.delete = {
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  };
  // ...
}
```

### Usage

```ts
import { NgxSwalifyService } from 'ngx-swalify';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly ngxSwalifyService = inject(NgxSwalifyService);
  protected readonly httpService = inject(HttpClient);

  showConfirm() {
    this.ngxSwalifyService.confirm();
  }

  // You can customize it as needed
  showCustomConfirm() {
    this.ngxSwalifyService.confirm({
      options: {
        text: 'Are you sure you want to update',
      },
      preConfirmObservable: this.httpService.patch('https://jsonplaceholder.typicode.com/posts/1', {
        title: 'foo',
      }),
    });
  }
}
```

### [See an example in StackBlitz](https://stackblitz.com/edit/stackblitz-starters-sjmfubjv?file=src%2Fmain.ts)
