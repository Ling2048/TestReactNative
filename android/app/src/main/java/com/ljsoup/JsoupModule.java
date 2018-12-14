package com.ljsoup;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.util.Map;
import java.util.HashMap;

public class JsoupModule extends ReactContextBaseJavaModule {

    public JsoupModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }


//  @Override
//  public String getName() {
//    return "ToastExample";
//  }

//    @Override
//    public Map<String, Object> getConstants() {
//        final Map<String, Object> constants = new HashMap<>();
//        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
//        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
//        return constants;
//    }

    @ReactMethod
    public void getHtml(Callback callback) {
        String html = "<html><head><title>First parse</title></head>"
                + "<body><p>Parsed HTML into a doc.</p></body></html>";
        Document doc = Jsoup.parse(html);
        //Toast.makeText(getReactApplicationContext(), html, Toast.LENGTH_LONG).show();
        callback.invoke(doc.body().html());
        //Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @Override
    public String getName() {
        return "JsoupExample";
    }
}
